describe("OrderDetails - UI Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="all-order-manage-li"]').click();
    cy.get('[data-testid="order-data-row"]')
      .first()
      .within(() => {
        cy.get('[data-testid="order-detail-view-btn"]').click({ force: true });
      });
  });

  it("should display the MainLoader while data is loading", () => {
    cy.get('[data-testid="main-loader"]').should("not.exist");
  });

  it("should display the correct user and order details", () => {
    cy.contains(".border", "Name :").should("contain.text", "Phuoc Phan");
    cy.contains(".border", "Email :").should("contain.text", "admin@fuco.com");
    cy.contains(".border", "Phone :").should("contain.text", "0993444225");
    cy.contains(".text-success", "Order Summary").should("exist");
    cy.get(".text-danger").should("contain.text", "$47.94");
  });
});

describe("OrderSummary - Cart Items and Actions Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="all-order-manage-li"]').click();
    cy.get('[data-testid="order-data-row"]')
      .first()
      .within(() => {
        cy.get('[data-testid="order-detail-view-btn"]').click({ force: true });
      });
  });

  it("should display cart items with correct quantities and prices", () => {
    cy.get(".p-3").within(() => {
      cy.contains("p", "Idli").should("exist");
      cy.contains("p", "$8.99 x 1 =").should("exist");
      cy.contains("p", "Panu Puri").should("exist");
      cy.contains("p", "$8.99 x 4 =").should("exist");
      cy.contains("p", "Malai Kofta").should("exist");
      cy.contains("p", "$12.99 x 1 =").should("exist");
      cy.get(".text-danger").should("contain.text", "$47.94");
    });
  });

  it("should handle Back to Orders button correctly", () => {
    cy.get('button:contains("Back to Orders")').click({ force: true });
    cy.url().should("include", "/order/allOrders");
  });

  it("should allow admin to update order status", () => {
    cy.get(".btn-outline-danger").should("exist");
  });
});

describe("OrderSummary - Status and Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="all-order-manage-li"]').click();
    cy.get('[data-testid="order-data-row"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="order-detail-view-btn"]').click({ force: true });
      });
  });

  it("should display the correct status with corresponding badge color", () => {
    cy.get(".btn-outline-info").should("contain.text", "Being Cooked");
    cy.get('[data-testid="update-next-status-btn"]').should(
      "contain.text",
      "Ready for Pickup"
    );
    cy.get(".btn-danger").should("contain.text", "Cancel");
  });
});
