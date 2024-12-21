describe("ManageUsers - UI and Functional Tests", () => {
  beforeEach(() => {
    // Login
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    // Redirect to ManageUsers
    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="manage-users-li"]').click();

    cy.url().should("include", "/user/manageUsers");
  });

  it("should display the correct UI elements", () => {
    // Kiểm tra tiêu đề và ảnh trang
    cy.contains("h1", "Manage Users").should("exist");
    cy.get("img").should("have.attr", "src").and("not.be.empty");

    // Kiểm tra các tiêu đề cột trong bảng
    cy.get("table thead tr").within(() => {
      cy.contains("Name").should("exist");
      cy.contains("Email").should("exist");
      cy.contains("Phone").should("exist");
      cy.contains("Role").should("exist");
    });
  });

  it("should display the list of users", () => {
    // Đảm bảo danh sách người dùng được hiển thị
    cy.get("table tbody tr").should("have.length.at.least", 1);

    // Kiểm tra thông tin người dùng đầu tiên
    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("td").eq(0).should("not.be.empty"); // Name
        cy.get("td").eq(1).should("not.be.empty"); // Email
        cy.get("td").eq(2).should("not.be.empty"); // Phone
        cy.get("td").eq(3).should("not.be.empty"); // Role
      });
  });

  it("should lock and unlock a user", () => {
    // Lấy người dùng đầu tiên
    cy.get("table tbody tr")
      .eq(7)
      .within(() => {
        cy.get("button")
          .contains("Lock")
          .click({ force: true })
          .then(() => {
            // cy.contains("Lock this user successfully").should("be.visible");
            cy.get("button").contains("Active");
          });

        cy.get("button")
          .contains("Active")
          .click({ force: true })
          .then(() => {
            cy.get("button").contains("Lock");

            //cy.contains("Unlock this user successfully").should("be.visible");
          });
      });
  });

  it("should navigate to permission page for a user", () => {
    // Nhấn nút phân quyền
    cy.get("table tbody tr")
      .eq(9)
      .within(() => {
        cy.get("button").contains("Permission").click({ force: true });
      });

    // Đảm bảo điều hướng đến đúng URL
    cy.url().should("include", "/user/permissionUser/");
  });

  it("should display loader when loading data", () => {
    // Mô phỏng việc tải dữ liệu bằng cách reload trang
    cy.reload();

    // Kiểm tra loader
    cy.get('[data-testid="main-loader"]').should("be.visible");

    // Đảm bảo loader biến mất sau khi tải xong
    cy.get('[data-testid="main-loader"]').should("not.exist");
    cy.get("table tbody tr").should("exist");
  });
});
