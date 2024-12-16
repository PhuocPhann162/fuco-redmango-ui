describe("Register Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");

    cy.intercept("POST", "/api/register", (req) => {
      req.reply({
        statusCode: 200,
        body: { data: true },
      });
    }).as("registerUser");
  });

  it("should fill the form and submit successfully", () => {
    cy.get('input[name="userName"]').type("resuitetest123@example.com");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="phoneNumber"]').type("1234567890");
    cy.get('input[name="password"]').type("Customer123*");
    cy.get('input[name="confirmPassword"]').type("Customer123*");
    cy.get('input[name="streetAddress"]').type("123 Main St");
    cy.get('input[name="city"]').type("New York");
    cy.get('input[name="state"]').type("NY");
    cy.get('input[name="postalCode"]').type("10001");

    cy.get('button[type="submit"]').click();

    cy.contains("Registration new account successfully!").should("be.visible");
  });

  it("should fill the form and submit fail because Username already exists", () => {
    cy.get('input[name="userName"]').type("testuser@example.com");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="phoneNumber"]').type("1234567890");
    cy.get('input[name="password"]').type("Customer123*");
    cy.get('input[name="confirmPassword"]').type("Customer123*");
    cy.get('input[name="streetAddress"]').type("123 Main St");
    cy.get('input[name="city"]').type("New York");
    cy.get('input[name="state"]').type("NY");
    cy.get('input[name="postalCode"]').type("10001");

    cy.get('button[type="submit"]').click();

    cy.contains("Username already exists").should("be.visible");
  });

  it("should show error message if password and confirm password do not match", () => {
    cy.get('input[name="userName"]').type("testuser@example.com");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="phoneNumber"]').type("1234567890");
    cy.get('input[name="password"]').type("Password123");
    cy.get('input[name="confirmPassword"]').type("Password456"); // Khác với password

    cy.contains("The password and confirmation password do not match.").should(
      "be.visible"
    );
  });

  it("should show loading indicator when form is submitting", () => {
    cy.get('input[name="userName"]').type("testuser@example.com");
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="phoneNumber"]').type("1234567890");
    cy.get('input[name="password"]').type("Password123");
    cy.get('input[name="confirmPassword"]').type("Password123");
    cy.get('input[name="streetAddress"]').type("123 Main St");
    cy.get('input[name="city"]').type("New York");
    cy.get('input[name="state"]').type("NY");
    cy.get('input[name="postalCode"]').type("10001");

    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="main-loader"]').should("be.visible");
  });
});
