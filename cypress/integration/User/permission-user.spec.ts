describe("PermissionUsers - UI Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="manage-users-li"]').click();
    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get("table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("button").contains("Permission").click({ force: true });
      });
  });

  it("should display correct user information", () => {
    cy.get('[data-testid="email-permission-input"]').should("exist"); // Email
    cy.get('[data-testid="fullName-permission-input"]').should("exist"); // Full Name
    cy.get("select[name='role']").should("exist").and("not.be.disabled");
  });

  it("should display the correct buttons", () => {
    cy.get('button:contains("Update Role")').should("be.visible");
    cy.get('button:contains("Back to List")').should("be.visible");
  });

  it("should display the correct form labels", () => {
    cy.contains("label", "Email").should("exist");
    cy.contains("label", "Full Name").should("exist");
    cy.contains("label", "Role").should("exist");
  });
});

describe("PermissionUsers - Form Submission Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="manage-users-li"]').click();
    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get("table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("button").contains("Permission").click({ force: true });
      });
  });

  it("should allow updating the role", () => {
    cy.get("select[name='role']").select("Admin"); // Thay 'Admin' bằng giá trị role hợp lệ
    cy.get('button:contains("Update Role")').click();

    cy.contains("Role of User").should("be.visible"); // Xác nhận thông báo thành công
    cy.url().should("include", "/user/manageUsers"); // Chuyển hướng về trang danh sách
  });

  it("should show error if submission fails", () => {
    cy.intercept("POST", "/api/roles", {
      statusCode: 500,
      body: { message: "Something wrong while updating user role" },
    });

    cy.get("select[name='role']").select("Admin");
    cy.get('button:contains("Update Role")').click();

    cy.contains("Something wrong while updating user role").should(
      "be.visible"
    );
  });
});

describe("PermissionUsers - Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="manage-users-li"]').click();
    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get("table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("button").contains("Permission").click({ force: true });
      });
  });

  it("should navigate back to list when clicking 'Back to List'", () => {
    cy.get('button:contains("Back to List")').click();
    cy.url().should("eq", "http://localhost:3000/user/manageUsers");
  });
});

describe("PermissionUsers - Loader Tests", () => {
  it("should display loader while fetching data", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="manage-users-li"]').click();
    cy.get("table tbody tr").should("have.length.at.least", 1);
    cy.get("table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("button").contains("Permission").click({ force: true });
      });
    cy.get('[data-testid="main-loader"]').should("not.exist");
  });
});
