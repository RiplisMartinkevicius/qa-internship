describe("Scenario one", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Should navigate to mens Hoodies & Sweatshirts section.", () => {
    cy.visit("/");
    cy.get("a#ui-id-5").should("be.visible").trigger("mouseover");
    cy.get("a#ui-id-17").should("be.visible").trigger("mouseover");
    cy.get("a#ui-id-20").should("be.visible").click();

    cy.url().should(
      "include",
      "/men/tops-men/hoodies-and-sweatshirts-men.html"
    );
  });

  it("Should check/assert that the displayed number of jackets matches the selected number of jackets displayed per page.", () => {
    cy.get(".product-image-photo").then(($products) => {
      const productCount = $products.length;
      cy.get("#limiter option[selected='selected']").then(($selectedOption) => {
        const itemsPerPage = parseInt($selectedOption.val());
        expect(productCount).to.equal(itemsPerPage);
      });
    });
  });

  it("Should select 'Frankie Sweatshirt' and open its details.", () => {
    cy.contains("a", "Frankie Sweatshirt").should("be.visible").click();
  });

  it("Should select size, colour and quantity.", () => {
    cy.get("#option-label-size-143-item-167")
      .should("be.visible")
      .click()
      .should("have.class", "selected");
    cy.get("#option-label-color-93-item-60")
      .should("be.visible")
      .click()
      .should("have.class", "selected");
    cy.get("#qty").clear().type("3").should("have.value", "3");
  });

  it("Should add product to cart and check that cart icon is updated with product quantity.", () => {
    cy.get("#product-addtocart-button").should("be.visible").click();
    cy.wait(1000);
    cy.get("a.action.showcart")
      .find(".counter-number")
      .should("have.text", "3");
  });

  it("Should open cart and check if product match the one You added to the cart.", () => {
    cy.get("div.minicart-wrapper").should("be.visible").click();
    cy.get("a.action.viewcart").should("be.visible").click();
    cy.url().should("include", "/checkout/cart");
    cy.get("tr.item-info").should("contain.text", "Frankie Sweatshirt");
    cy.contains("Frankie Sweatshirt").should("exist");
    cy.wait(4000);
  });

  it("Should proceed to checkout.", () => {
    cy.get("button[data-role='proceed-to-checkout']")
      .should("be.visible")
      .click({ multiple: true });
  });

  it("Should complete the order.", () => {
    cy.url().should("include", "/checkout/#shipping");

    cy.get("#customer-email")
      .should("be.visible")
      .type("john.doe@yahoo.com")
      .should("have.value", "john.doe@yahoo.com");
    cy.get("input[name='firstname']")
      .should("be.visible")
      .type("John")
      .should("have.value", "John");
    cy.get("input[name='lastname']")
      .should("be.visible")
      .type("Doe")
      .should("have.value", "Doe");
    cy.get("input[name='street[0]']")
      .should("be.visible")
      .type("Dream avenue 45, Cloud district")
      .should("have.value", "Dream avenue 45, Cloud district");
    cy.get("input[name='city']")
      .should("be.visible")
      .type("Nine")
      .should("have.value", "Nine");
    cy.get("input[name='postcode']")
      .should("be.visible")
      .type("66424")
      .should("have.value", "66424");
    cy.get("select[name='country_id']")
      .should("be.visible")
      .select("Nepal")
      .should("have.value", "NP");
    cy.get("input[name='telephone']")
      .should("be.visible")
      .type("+97714420858")
      .should("have.value", "+97714420858");
    cy.wait(3000);
    cy.get("button[data-role='opc-continue']").should("be.visible").click();

    cy.url().should("include", "/checkout/#payment");
    cy.get("button[title='Place Order']").should("be.visible").click();
  });
});
