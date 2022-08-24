import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';

import { BaseApi, RequestOptions } from './base-api';
import {jwtCollector, JwtProvider} from '../../jwt-auth/jwt-provider';


/**
 * Base class for Api wrappers that call authenticated endpoints
 */
export abstract class BaseAuthenticatedApi extends BaseApi {
    protected readonly tokensProvider: JwtProvider;

    protected constructor(httpClient: HttpClient, tokensProvider: JwtProvider) {
        super(httpClient);

        this.tokensProvider = tokensProvider;
    }

  /**
   * Creates options for an authenticated HttpClient request
   * @param params
   * @protected
   */
    protected override createRequestOptions(params?: HttpParamsOptions): RequestOptions {
        const reqOptions: RequestOptions = super.createRequestOptions(params);
        const tokens: jwtCollector = this.tokensProvider.getTokens();
        const headersWithAuth: HttpHeaders = reqOptions.headers.set(
          'Authorization',
          `${tokens.refreshToken},${tokens.accessToken}`
        );

        return {
          headers: headersWithAuth,
          params: reqOptions.params,
        };
    }
}
