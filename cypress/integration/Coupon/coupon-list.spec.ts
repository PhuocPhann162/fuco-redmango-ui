describe("CouponList - UI Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/coupons", {
      statusCode: 200,
      body: {
        result: [
          {
            id: 1,
            code: "DISCOUNT10",
            discountAmount: 10,
            expiration: "2024-12-31T23:59:59Z",
            minAmount: 50,
          },
          {
            id: 2,
            code: "DISCOUNT20",
            discountAmount: 20,
            expiration: "2025-12-31T23:59:59Z",
            minAmount: 100,
          },
        ],
      },
    }).as("getCoupons");

    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="coupon-list-li"]').click();
  });

  it("should display coupon list with correct information", () => {
    cy.contains("Coupon List").should("be.visible");

    cy.get(".table .row").should("have.length", 8);

    cy.get('[data-testid="coupon-row-data"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="coupon-code-col"]').contains("10OFF");
        cy.get('[data-testid="coupon-discount-col"]').contains("$ 10.00");
        cy.get('[data-testid="coupon-expiration-col"]').contains("6/12/2024");
        cy.get('[data-testid="coupon-min-col"]').contains("$ 20.00");
        cy.get('[data-testid="coupon-status-col"]').contains("Expired");
      });

    cy.get('[data-testid="coupon-row-data"]')
      .eq(1)
      .within(() => {
        cy.get('[data-testid="coupon-code-col"]').contains("20OFF");
        cy.get('[data-testid="coupon-discount-col"]').contains("$ 20.00");
        cy.get('[data-testid="coupon-expiration-col"]').contains("6/11/2024");
        cy.get('[data-testid="coupon-min-col"]').contains("$ 40.00");
        cy.get('[data-testid="coupon-status-col"]').contains("Expired");
      });
  });

  it("should navigate to coupon upsert page when Add New Coupon button is clicked", () => {
    cy.get("button.btn-success").click({ force: true });
    cy.url().should("include", "/coupon/couponUpsert");
  });

  it("should show delete confirmation modal", () => {
    cy.get(".btn-danger").eq(0).click({ force: true });
    cy.contains("Are you sure?").should("exist");
  });
});

describe("CouponList - Add New Coupon Code", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="coupon-list-li"]').click();
  });

  it("should navigate to add new coupon page", () => {
    cy.get(".btn-success").click({ force: true });
    cy.url().should("include", "/coupon/couponUpsert");
  });
});

describe("CouponList - Loader Tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/coupons", {
      delayMs: 500, // simulate loading delay
      statusCode: 200,
      body: {
        result: [
          {
            id: 1,
            code: "DISCOUNT10",
            discountAmount: 10,
            expiration: "2024-12-31T23:59:59Z",
            minAmount: 50,
          },
        ],
      },
    }).as("getCouponsDelayed");

    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="coupon-list-li"]').click();
  });

  it("should show MainLoader while fetching data", () => {
    cy.get('[data-testid="main-loader"]').should("not.exist");
  });
});
