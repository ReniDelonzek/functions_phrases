
export class Mutations {
    static insertNewUser = `mutation insert_new_user($email: String, $uid: String, $name: String) {
        insert_user_one(object: {email: $email, uid: $uid, name: $name}) {
          id
        }
      }
      `;
}