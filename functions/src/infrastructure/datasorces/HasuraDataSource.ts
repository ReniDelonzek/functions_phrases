import { HasuraDataSource } from "../../domain/repositories/HasuraDataSource";
import graphql = require("graphql-request");
import { authHasura } from "../secutiry/HasuraAuth";
import { BASE_URL_HASURA } from "../config/Constants";


export class HasuraDataSourceImpl implements HasuraDataSource {
    async executeMutation(mutation: string, args: any): Promise<any> {
        const res = await this.graphQLClient
        .request(mutation, args, args);
      return res;
    }

    graphQLClient = new graphql.GraphQLClient(BASE_URL_HASURA, {
        headers: authHasura
    });

    async executeQuery(query: string, args: any): Promise<any> {
      const res = await this.graphQLClient
        .request(query, args, args);
      return res;
    }

}