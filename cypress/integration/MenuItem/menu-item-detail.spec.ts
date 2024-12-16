describe("MenuItemDetails - UI Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/menuItemDetails/1");
  });

  it("should display the correct title, image, and buttons", () => {
    cy.contains("h2", "Spring Roll").should("exist");
    cy.get('[data-testid="backToHome-btn"]').should("be.visible");
    cy.get(".btn-warning").contains("Add to Cart").should("exist");
    cy.get("img").should("have.attr", "src").and("not.be.empty");
  });

  it("should display default quantity as 1", () => {
    cy.get(".h3.mt-3.px-3").should("contain.text", "1");
  });
});

describe("MenuItemDetails - Add to Cart Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/menuItemDetails/1");
  });

  it("should add the item to cart with default quantity", () => {
    cy.get('button:contains("Add to Cart")').click();
    cy.url().should("include", "/login");

    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");

    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="menuItem-Card"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="view-detail-item-a"]').click();
      });

    cy.url().should("include", "/menuItemDetails/1");

    cy.get('button:contains("Add to Cart")').should("be.visible");

    cy.get('button:contains("Add to Cart")').click();

    cy.contains("Item added to cart successfully").should("be.visible");
  });

  it("should allow increasing and decreasing quantity", () => {
    cy.get(".bi-dash").click();
    cy.get(".h3.mt-3.px-3").should("contain.text", "1");

    cy.get(".bi-plus").click();
    cy.get(".h3.mt-3.px-3").should("contain.text", "2");
  });

  it("should redirect to login when user is not logged in", () => {
    cy.window().then((win) => {
      win.localStorage.removeItem("userAuthToken");
    });

    cy.get(".btn-warning").click();
    cy.url().should("include", "/login");
  });
});

describe("MenuItemDetails - Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/menuItemDetails/1");
  });

  it("should redirect to home page when clicking Back to Home button", () => {
    cy.get('[data-testid="backToHome-btn"]').click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("MenuItemDetails - Loader Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/menuItemDetails/1");
  });

  it("should display MainLoader while fetching data", () => {
    cy.get('[data-testid="main-loader"]').should("be.visible");
    cy.get(".row").should("exist");
  });

  it("should display MiniLoader while adding item to cart", () => {
    cy.get(".btn-warning").click();
    cy.url().should("include", "/login");

    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");

    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="menuItem-Card"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="view-detail-item-a"]').click();
      });

    cy.url().should("include", "/menuItemDetails/1");
    cy.get('button:contains("Add to Cart")').click();
    cy.get('[data-testid="mini-loader"]').should("be.visible");
    cy.contains("Item added to cart successfully").should("be.visible");
  });
});
