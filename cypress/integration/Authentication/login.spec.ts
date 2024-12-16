describe("Login Component Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login"); // Thay bằng đường dẫn đến trang Login
  });

  it("Should render the login form correctly", () => {
    // Kiểm tra các input trường username và password
    cy.get('input[name="userName"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    // Kiểm tra nút login
    cy.get('button[type="submit"]').contains("LOGIN").should("be.visible");
  });

  it("Should allow user to input username and password", () => {
    cy.get('input[name="userName"]').type("testUser");
    cy.get('input[name="password"]').type("testPassword");

    // Kiểm tra giá trị đã được nhập
    cy.get('input[name="userName"]').should("have.value", "testUser");
    cy.get('input[name="password"]').should("have.value", "testPassword");
  });

  it("Should display error for invalid credentials", () => {
    // Mock API response cho login với lỗi
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: {
        error: {
          data: {
            errorMessages: ["Invalid username or password"],
          },
        },
      },
    }).as("loginUserError");

    cy.get('input[name="userName"]').type("wrongUser");
    cy.get('input[name="password"]').type("wrongPassword");
    cy.get('button[type="submit"]').click();

    cy.contains("Username or password is incorrect").should("be.visible");
  });

  it("Should login successfully with valid credentials", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: {
        data: {
          result: {
            token: "mockedToken123",
          },
        },
      },
    }).as("loginUser");

    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");

    cy.get('button:contains("LOGIN")').click();
  });
});
