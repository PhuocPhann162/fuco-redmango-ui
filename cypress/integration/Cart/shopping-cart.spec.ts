describe("ShoppingCart - UI Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/shoppingCart");
    cy.url().should("include", "/login");

    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");

    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="btn-cart-preview"]').click();
  });

  it("should display the correct title, image, and buttons in Cart Summary section", () => {
    cy.contains("h3", "Cart Summary").should("exist");
    cy.get(".btn-warning").contains("Remove").should("exist");
    cy.get("img").should("have.attr", "src").and("not.be.empty");
    cy.get('[data-testid="btn-cart-preview"]')
      .invoke("text")
      .then((text) => {
        const match = text.match(/\((\d+)\)/);
        const cartItemQuantity = match ? parseInt(match[1], 10) : 0;
        cy.get('[data-testid="cart-item-section"]').should(
          "have.length",
          cartItemQuantity
        );
      });
  });

  it("should display the correct title, image, and buttons in Pickup Details section", () => {
    cy.contains("h1", "Pickup Details").should("exist");

    cy.get('input[name="name"]').should("have.value", "Phuoc Phan ");
    cy.get('input[name="email"]').should("have.value", "admin@fuco.com");
    cy.get('input[name="streetAddress"]').should("have.value", "289 Le Duan ");
    cy.get('input[name="phoneNumber"]').should("have.value", "0993444225");
    cy.get('input[name="city"]').should("have.value", "Da Nang");
    cy.get('input[name="state"]').should("have.value", "Hai Chau");
    cy.get('input[name="postalCode"]').should("have.value", "550000");

    cy.get('[data-testid="place-order-btn"]')
      .contains("Looks Good? Place Order!")
      .should("exist");
    cy.get(".btn-outline-secondary")
      .contains("Countinue Shopping")
      .should("exist");
  });
});

describe("ShoppingCart - Continue Shopping", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/shoppingCart");
    cy.url().should("include", "/login");

    cy.get('input[name="userName"]').type("admin@fuco.com");
    cy.get('input[name="password"]').type("Admin123*");

    cy.get('button:contains("LOGIN")').click();

    cy.get('[data-testid="btn-cart-preview"]').click();
  });

  it("continue shopping", () => {
    cy.window().then((win) => {
      win.scrollTo(0, 4);
    });
    cy.get(".btn-outline-secondary")
      .contains("Countinue Shopping")
      .should("exist");
    cy.get(".btn-outline-secondary")
      .contains("Countinue Shopping")
      .click({ force: true });
    cy.url().should("include", "/");
  });
});
