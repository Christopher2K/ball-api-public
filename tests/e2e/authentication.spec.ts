import test from "japa";
import supertest from "supertest";

import { getBaseUrl } from "tests/utils";
import UserAlreadyExistException from "App/Exceptions/UserAlreadyExistException";
import UsernameAlreadyTakenException from "App/Exceptions/UsernameAlreadyTakenException";

test.group("Auth - Signup scenarios", () => {
  /**
   * VARIABLES
   */
  const getSignupPayload = () => ({
    email: "test@test.fr",
    password: "password12345",
    username: "BallerBoss123",
  });

  /**
   * TESTS
   */
  test("user can signup", async (assert) => {
    const payload = getSignupPayload();

    const { body } = await supertest(getBaseUrl())
      .post("/auth/signup")
      .send(payload)
      .expect(200);

    assert.hasAllKeys(body, [
      "id",
      "username",
      "user_id",
      "created_at",
      "updated_at",
    ]);
  });

  test("user cannot create an account with an existing email", async (assert) => {
    let payload = getSignupPayload();
    payload.username = "newUsername";

    const { body } = await supertest(getBaseUrl())
      .post("/auth/signup")
      .send(payload)
      .expect(422);

    assert.include(body.message, new UserAlreadyExistException().code);
  });

  test("user cannot create an account with an existing username", async (assert) => {
    const payload = getSignupPayload();
    payload.email = "anotherEmail@test.fr";

    const { body } = await supertest(getBaseUrl())
      .post("/auth/signup")
      .send(payload)
      .expect(422);

    assert.include(body.message, new UsernameAlreadyTakenException().code);
  });
});
