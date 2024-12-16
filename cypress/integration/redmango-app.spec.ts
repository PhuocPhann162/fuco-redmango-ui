describe("HomeScreen - Test all features in the Home Screen of Online Food Restaurant", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("dislay all menuItems and categories to sort and filter when opening for the first time", () => {
    cy.get('[data-testid="category-list"]').should("exist");
    cy.get('[data-testid="category-list"] li').should("have.length", 9);

    cy.get('[data-testid="menuItem-Card"]').should("exist");
    cy.get('[data-testid="menuItem-Card"]').should("have.length", 10);
  });

  it("add a new menu item to the shopping cart", () => {
    cy.get('[data-testid="menuItem-Card"]')
      .eq(0)
      .within(() => {
        cy.get('[data-testid="btn-add-to-cart"]').click();
      });
    cy.get('[data-testid="btn-cart-preview"]').should("not.include.text", 0);
  });

  it("should search for items by name", () => {
    // Type value input
    cy.get('input[placeholder="Search for Food Items!"]').type("Paneer");

    // Check result
    cy.get('[data-testid="menuItem-Card"]').should("have.length", 2);

    // Check Menu Item name is existed?
    cy.get('[data-testid="menuItem-Card"]')
      .first()
      .should("contain", "Paneer Pizza");
    cy.get('[data-testid="menuItem-Card"]')
      .last()
      .should("contain", "Paneer Tikka");
  });

  it("filter by each menu item's category", () => {
    cy.get('[data-testid="category-filter-li"]').each(($category, _) => {
      cy.wrap($category).within(() => {
        cy.get('[data-testid="category-filter-btn"]').click();
      });

      cy.wrap($category)
        .find('[data-testid="category-filter-btn"]')
        .invoke("text")
        .then((categoryName) => {
          if (categoryName.trim() === "All") {
            cy.get('[data-testid="menuItem-Card"]').should("have.length", 10);
          } else {
            cy.get('[data-testid="menuItem-Card"]').each(($menuItem) => {
              cy.wrap($menuItem)
                .find(".badge")
                .should("have.text", categoryName.trim());
            });
          }
        });
    });
  });

  it("sort menu items by price and name", () => {
    cy.get('[data-testid="sort-price-name-li"]').each(($sortOption) => {
      cy.get(".nav-item.dropdown .nav-link.dropdown-toggle").click();
      cy.wrap($sortOption)
        .invoke("text")
        .then((sortType: string) => {
          // Click sort options
          cy.wrap($sortOption).click();

          // Get Menu Item Card list after apply sort
          cy.get('[data-testid="menuItem-Card"]').then(($menuItems) => {
            const itemsData: { name: string; price: number }[] = [];

            // Get info each menuItem
            $menuItems.each((_, menuItem) => {
              const name: string = Cypress.$(menuItem)
                .find(".card-title")
                .text()
                .trim();
              const price: number = parseFloat(
                Cypress.$(menuItem).find("h4").text().replace("$", "").trim()
              ); // Lấy giá

              itemsData.push({ name, price });
            });

            // Prepare template data sortedItems based on sortType
            const sortedItems =
              sortType.trim() === "Price Low - High"
                ? [...itemsData].sort((a, b) => a.price - b.price)
                : sortType.trim() === "Price High - Low"
                ? [...itemsData].sort((a, b) => b.price - a.price)
                : sortType.trim() === "Name A - Z"
                ? [...itemsData].sort(
                    (a, b) =>
                      a.name.toUpperCase().charCodeAt(0) -
                      b.name.toUpperCase().charCodeAt(0)
                  )
                : [...itemsData].sort(
                    (a, b) =>
                      b.name.toUpperCase().charCodeAt(0) -
                      a.name.toUpperCase().charCodeAt(0)
                  );

            // Check sortedItems is equal itemsData
            cy.wrap(itemsData).should("deep.equal", sortedItems);
          });
        });
    });
  });

  it("view menu item detail by ID", () => {
    cy.get('[data-testid="menuItem-Card"]').each(($menuItemCard, index) => {
      cy.get('[data-testid="view-detail-item-a"]').eq(index).click();
      cy.url().should("include", `/menuItemDetails/${index + 1}`);
      cy.go("back");
    });
  });
});
