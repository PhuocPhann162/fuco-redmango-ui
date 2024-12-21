describe("MenuItemList - UI and Functionality Tests", () => {
  beforeEach(() => {
    // Đảm bảo trang danh sách Menu Item được tải
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    // Redirect to ManageUsers
    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="menuItem-list-li"]').click();
  });

  it("should display the title, image, and Add New Menu Item button", () => {
    cy.contains("h1", "MenuItem List").should("exist");
    cy.get("img").should("have.attr", "src").and("not.be.empty");
    cy.get("button.btn-success").contains("Add New Menu Item").should("exist");
  });

  it("should navigate to Add New Menu Item page when clicking the button", () => {
    cy.get("button.btn-success").click({ force: true });
    cy.url().should("include", "/menuItem/menuItemUpsert");
  });

  it("should display menu items with correct columns", () => {
    // Kiểm tra các tiêu đề cột
    cy.get(".row.border")
      .first()
      .within(() => {
        cy.contains("Image").should("exist");
        cy.contains("ID").should("exist");
        cy.contains("Name").should("exist");
        cy.contains("Category").should("exist");
        cy.contains("Price").should("exist");
        cy.contains("Special Tag").should("exist");
        cy.contains("Action").should("exist");
      });

    // Kiểm tra danh sách menu item (ít nhất 1 item tồn tại)
    cy.get(".row.border").not(":first").should("exist");
  });

  it("should allow navigating to edit a menu item", () => {
    cy.get('[data-testid="edit-menuItem-btn"]').first().click({ force: true });
    cy.url().should("include", "/menuItem/menuItemUpsert/2");
  });

  it("should display the delete modal when clicking delete button", () => {
    cy.get(".btn-danger").first().click({ force: true });
    cy.contains("Do you really want to delete this menu item?").should("exist");

    // Đóng modal
    cy.contains("button", "Cancel").click({ force: true });
    cy.contains("Do you really want to delete this menu item?").should(
      "not.exist"
    );
  });
});
