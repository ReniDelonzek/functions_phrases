import { ClientApi } from "../../domain/repositories/ClientApi";
import { HasuraDataSource } from "../../domain/repositories/HasuraDataSource";
import { Mutations } from "./Mutations";

 
export class HasuraClientApi implements ClientApi {
  dataSource: HasuraDataSource;

  constructor(dataSource: HasuraDataSource) {
    this.dataSource = dataSource;
  }

  async insertNewUser(email: string, uid: string): Promise<boolean> {
      return (await this.dataSource.executeMutation(Mutations.insertNewUser, { email: email, name: '', uid: uid }) != null);
  }

}