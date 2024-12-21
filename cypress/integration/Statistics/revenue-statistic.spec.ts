describe("Revenue - UI Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="revenue-statistic-li"]').click();
  });

  it("should display the header with image and title", () => {
    cy.url().should("include", "/revenue");
    cy.get('img[alt="Decoration Header"]').should("exist");
    cy.contains("h1", "Statistics").should("exist");
  });

  it("should display the correct sections and radio buttons", () => {
    cy.contains("h2", "Revenue").should("exist");
    cy.contains("h2", "Orders").should("exist");

    cy.get('input[type="radio"][value="DailyChart"]').should("exist");
    cy.get('label[for="flexRadioDefault1"]').should(
      "contain.text",
      "Daily Revenue"
    );

    cy.get('input[type="radio"][value="MonthlyChart"]').should("exist");
    cy.get('label[for="flexRadioDefault2"]').should(
      "contain.text",
      "Monthly Revenue"
    );

    cy.get('input[type="radio"][value="YearlyChart"]').should("exist");
    cy.get('label[for="flexRadioDefault3"]').should(
      "contain.text",
      "Yearly Revenue"
    );

    cy.get('input[type="radio"][value="DailyOrdersChart"]').should("exist");
    cy.get('label[for="flexRadioDefault4"]').should(
      "contain.text",
      "Daily Orders"
    );

    cy.get('input[type="radio"][value="MonthlyOrdersChart"]').should("exist");
    cy.get('label[for="flexRadioDefault5"]').should(
      "contain.text",
      "Monthly Orders"
    );

    cy.get('input[type="radio"][value="YearlyOrdersChart"]').should("exist");
    cy.get('label[for="flexRadioDefault6"]').should(
      "contain.text",
      "Yearly Orders"
    );
  });
});

describe("Revenue - Chart Selection Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");
    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="admin-panel-li"]').click();
    cy.get('[data-testid="revenue-statistic-li"]').click();
  });

  it("should display Daily Revenue chart by default", () => {
    cy.get('input[type="radio"][value="DailyChart"]').should("be.checked");
    cy.get("div").contains("Daily Revenue").should("exist");
  });

  it("should change to Monthly Revenue chart on selecting the corresponding radio button", () => {
    cy.get('input[type="radio"][value="MonthlyChart"]').check();
    cy.get("div").contains("Monthly Revenue").should("exist");
  });

  it("should change to Yearly Revenue chart on selecting the corresponding radio button", () => {
    cy.get('input[type="radio"][value="YearlyChart"]').check();
    cy.get("div").contains("Yearly Revenue").should("exist");
  });

  it("should change to Daily Orders chart on selecting the corresponding radio button", () => {
    cy.get('input[type="radio"][value="DailyOrdersChart"]').check();
    cy.get("div").contains("Daily Orders").should("exist");
  });

  it("should change to Monthly Orders chart on selecting the corresponding radio button", () => {
    cy.get('input[type="radio"][value="MonthlyOrdersChart"]').check();
    cy.get("div").contains("Monthly Orders").should("exist");
  });

  it("should change to Yearly Orders chart on selecting the corresponding radio button", () => {
    cy.get('input[type="radio"][value="YearlyOrdersChart"]').check();
    cy.get("div").contains("Yearly Orders").should("exist");
  });
});
