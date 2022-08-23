import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Collection, Document, FilterQuery, Types } from 'mongoose';

import { environment } from '../../../../src/environments/environment';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

export const injectHttpClient = (): HttpClient => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [],
    });

    return TestBed.inject(HttpClient);
};

const dbCollectionNames = {
    userCollection: 'Users',
    docCollection: 'Documents',
    myVehicleCollection: 'MyVehicles',
} as const;

export interface MongoDpApiCredentials {
    apiBaseUrl: string;
    clusterName: string;
    apiKey: string;
    dbName: string;
}

let apiCredentials: MongoDpApiCredentials | null = null;
export const getApiCredentials = async (): Promise<MongoDpApiCredentials> => {
    // Send the request only if necessary
    // Credentials are static, so there's no need to flood the server with requests
    if (apiCredentials !== null) {
        return apiCredentials;
    } else {
        const reqUrl: string = `${environment.serverBaseUrl}/api/testing/mongoDbApi/credentials`;

        const res: AxiosResponse<MongoDpApiCredentials> = await axios.get<MongoDpApiCredentials>(
            reqUrl
        );

        apiCredentials = res.data;

        return apiCredentials;
    }
};

export type DocId = string | Types.ObjectId;

interface MongoDbReqParams {
    requestPath: string;
    body: MongoDbReqBody;
}

interface MongoDbReqBody {
    /**
     * Cluster name
     */
    dataSource: string;

    /**
     * Database name
     */
    database: string;

    /**
     * Collection name
     */
    collection: string;
}

interface MongoDbInsertReq<D> extends MongoDbReqBody {
    /**
     * Document to send
     */
    document: D;
}

export interface MongoDbSingleInsertResponse {
    insertedId: DocId;
}

export interface MongoDbFilterReq extends MongoDbReqBody {
    /**
     * Filters for a query
     */
    filter: FilterQuery<Document>;

    // There could be other fields, but these are sufficient for my purposes
}

/**
 * Wrapper for actual ObjectIds that needs to be sent in order to tell
 * the MongoDb Data Api that the value is indeed an ObjectId
 */
export class ApiObjectId {
    $oid: DocId;

    constructor(objId: DocId) {
        this.$oid = objId;
    }
}

export class MongoDbApi {
    private readonly credentials: MongoDpApiCredentials;
    private readonly verbose: boolean;

    public constructor(credentials: MongoDpApiCredentials, verbose: boolean = false) {
        this.credentials = credentials;
        this.verbose = verbose;
    }

    /*
     * Get user document by _id
     */
    public async getUserDocument(userId: DocId): Promise<any> {
        return await this.getDocumentById<any>(
            dbCollectionNames.userCollection,
            userId
        );
    }

    /*
     * Get match document by _id
     */
    public async getVehicleDocument(vehicleId: DocId): Promise<any> {
        return await this.getDocumentById<any>(
            dbCollectionNames.myVehicleCollection,
            vehicleId
        );
    }


    /*
     * Get a document by _id from the specified collection
     */
    public async getDocumentById<T extends Document>(
        collectionName: string,
        docId: DocId
    ): Promise<T> {
        const filter: FilterQuery<Document> = {
            _id: new ApiObjectId(docId),
        };

        return await this.getDocument<T>(filter, collectionName);
    }


    public async getDocument<D extends Document>(
        filter: FilterQuery<Document>,
        collection: string
    ): Promise<D> {
        const reqBody: MongoDbFilterReq = {
            dataSource: this.credentials.clusterName,
            database: this.credentials.dbName,
            collection: collection,
            filter: filter,
        };

        return await this.sendMongoDbRequest<D>({
            requestPath: '/action/findOne',
            body: reqBody,
        });
    }

    public async insertUser(userData: any): Promise<MongoDbSingleInsertResponse> {
        return await this.insertDocument<any>(userData, dbCollectionNames.userCollection);
    }

    public async insertVehicle(vehicleData: any): Promise<MongoDbSingleInsertResponse> {
        return await this.insertDocument<any>(
            vehicleData,
            dbCollectionNames.myVehicleCollection
        );
    }


    public async insertDocument<I>(
        insertData: I,
        collection: string
    ): Promise<MongoDbSingleInsertResponse> {
        const reqBody: MongoDbInsertReq<I> = {
            dataSource: this.credentials.clusterName,
            database: this.credentials.dbName,
            collection: collection,
            document: insertData,
        };

        return await this.sendMongoDbRequest<MongoDbSingleInsertResponse>({
            requestPath: '/action/insertOne',
            body: reqBody,
        });
    }

    /**
     * Deletes the user with the provided id from the database
     * @param userId
     */
    public async deleteUser(userId: DocId): Promise<void> {
        return this.deleteMultipleUsers([userId]);
    }

    /**
     * Deletes the vehicle with the provided id from the database
     * @param vehicleId
     */
    public async deleteVehicle(vehicleId: DocId): Promise<void> {
        return this.deleteMultipleVehicles([vehicleId]);
    }


    /**
     * Deletes from the database the users with the provided ids
     * @param userIds ids of the users that should be deleted
     */
    public async deleteMultipleUsers(userIds: DocId[]): Promise<void> {
        await this.deleteMultipleDocumentsById(dbCollectionNames.userCollection, userIds);
    }

    /**
     * Deletes from the database the vehicles with the provided ids
     * @param vehicleIds ids of the users that should be deleted
     */
    public async deleteMultipleVehicles(vehicleIds: DocId[]): Promise<void> {
        await this.deleteMultipleDocumentsById(dbCollectionNames.myVehicleCollection, vehicleIds);
    }


    private async deleteMultipleDocumentsById(collection: string, docIds: DocId[]): Promise<void> {
        const queryDocIds: ApiObjectId[] = docIds.map(
            (dId: string | Types.ObjectId): ApiObjectId => {
                return new ApiObjectId(dId);
            }
        );

        const multipleIdsFilter: FilterQuery<Document> = {
            _id: { $in: queryDocIds },
        };
        return this.deleteMultipleDocuments(collection, multipleIdsFilter);
    }

    private async deleteMultipleDocuments(
        collection: string,
        filter: FilterQuery<Document> = {}
    ): Promise<void> {
        const reqBody: MongoDbFilterReq = {
            dataSource: this.credentials.clusterName,
            database: this.credentials.dbName,
            collection: collection,
            filter: filter,
        };

        // Response should contain something like "deletedCount: x"
        await this.sendMongoDbRequest<Object>({
            requestPath: '/action/deleteMany',
            body: reqBody,
        });
    }

    /*
     * Send a request to the MongoDb REST API with the specified parameters
     */
    private async sendMongoDbRequest<R>(reqParams: MongoDbReqParams): Promise<R> {
        try {
            const url: string = `${this.credentials.apiBaseUrl}${reqParams.requestPath}`;
            const reqData: Object = reqParams.body;

            const reqHeaders = {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': this.credentials.apiKey,
            };
            const axiosReqConfig: AxiosRequestConfig = {
                headers: reqHeaders,
            };

            this.logRequest(reqParams);

            const res = await axios.post<R>(url, reqData, axiosReqConfig);
            return res.data;
        } catch (err) {
            if (err instanceof Error) {
                console.log('Error has occurred in MongoDbApi');
                console.log(err.message);
            }

            throw err;
        }
    }

    private logRequest(reqParams: MongoDbReqParams) {
        // Do not log if not verbose
        if (!this.verbose) {
            return;
        }

        console.log('[MongoDbApi] Request sent:');
        console.log(reqParams);
    }
}
