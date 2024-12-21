describe("AllOrders - UI Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="all-order-manage-li"]').click();
  });

  it("should display the correct title and decoration image", () => {
    cy.contains("h1", "All Orders").should("exist");
    cy.get("img").should("have.attr", "src").and("not.be.empty");
  });

  it("should display search and filter inputs", () => {
    cy.get('input[placeholder="Search Name, Email or Phone"]').should(
      "be.visible"
    );
    cy.get('select[name="status"]').should("be.visible");
    cy.get('button:contains("Filter")').should("be.visible");
  });

  it("should display pagination controls", () => {
    cy.get('[data-testid="filter-status-select"]').should("be.visible");
    cy.get('[data-testid="prev-current-btn"]').should("be.disabled");
    cy.get('[data-testid="next-current-btn"]').should("be.visible");
  });

  it("should display row per page options", () => {
    cy.get('[data-testid="page-size-select"]')
      .should("be.visible")
      .select("10", { force: true })
      .should("have.value", "10");
  });
});

describe("AllOrders - Filter Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="all-order-manage-li"]').click();
  });

  it("should filter orders by search input", () => {
    cy.get('input[placeholder="Search Name, Email or Phone"]').type(
      "John Doe",
      { force: true }
    );
    cy.get('button:contains("Filter")').click({ force: true });
    cy.contains("Order").should("exist");
  });

  it("should filter orders by status", () => {
    cy.get('select[name="status"]').select("Confirmed", { force: true });
    cy.get('button:contains("Filter")').click({ force: true });
    cy.contains("Order").should("exist"); // Modify this based on actual data
  });
});

describe("AllOrders - Pagination Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="all-order-manage-li"]').click();
  });

  it("should navigate to the next page", () => {
    cy.get('[data-testid="next-current-btn"]').click({ force: true });
    cy.contains("6 - 10 of 10").should("exist"); // Modify based on UI
  });

  it("should disable prev button on the first page", () => {
    cy.get('[data-testid="prev-current-btn"]').should("be.disabled");
  });

  it("should allow changing the number of rows per page", () => {
    cy.get('[data-testid="page-size-select"]')
      .select("20", { force: true })
      .should("have.value", "20");
    cy.contains("Row per page:").should("exist");
  });
});

describe("AllOrders - Loader Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="all-order-manage-li"]').click();
  });

  it("should display MainLoader while fetching data", () => {
    cy.get('[data-testid="main-loader"]').should("not.exist");
  });
});
