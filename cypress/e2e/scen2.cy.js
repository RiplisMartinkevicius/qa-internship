describe("Scenario two", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Should navigate to women pants section.", () => {
    cy.visit("/");
    cy.get("a#ui-id-4").should("be.visible").trigger("mouseover");
    cy.get("a#ui-id-10").should("be.visible").trigger("mouseover");
    cy.get("a#ui-id-15").should("be.visible").click();

    cy.url().should("include", "/women/bottoms-women/pants-women.html");
  });

  it("Should filter section to show the cheapest products available.", () => {
    cy.url().should("include", "/women/bottoms-women/pants-women.html");

    cy.contains("div.filter-options-title", "Price")
      .should("be.visible")
      .click();
    cy.get("div.filter-options-content").should("be.visible");
    cy.get("div.filter-options-content a")
      .contains("$30.00 - $39.99")
      .should("be.visible")
      .click({ force: true });
    cy.wait(6000);
    cy.get("#sorter").should("be.visible").select("Price");
  });

  it("Should select the cheapest pants and add them to the cart.", () => {
    cy.url().should("include", "/women/bottoms-women/pants-women.html");

    cy.wait(6000);
    cy.get("div#option-label-size-143-item-171")
      .first()
      .should("be.visible")
      .click();
    cy.get("div#option-label-color-93-item-52")
      .first()
      .should("be.visible")
      .click();
    cy.get(".product.actions.product-item-actions").eq(0).invoke("show");
    cy.contains("Add to Cart").click({ force: true });
  });

  it("Should add 2 more products to the cart. Check that cart icon is updated with each product.", () => {
    cy.url().should("include", "/women/bottoms-women/pants-women.html");

    cy.get("div#option-label-size-143-item-171")
      .eq(1)
      .should("be.visible")
      .click();
    cy.get("div#option-label-color-93-item-58")
      .eq(0)
      .should("be.visible")
      .click();
    cy.get(".product.actions.product-item-actions").eq(1).invoke("show");
    cy.contains("Add to Cart").click({ force: true });

    cy.get("div#option-label-size-143-item-171")
      .eq(2)
      .should("be.visible")
      .click();
    cy.get("div#option-label-color-93-item-50")
      .eq(1)
      .should("be.visible")
      .click();
    cy.get(".product.actions.product-item-actions").eq(2).invoke("show");
    cy.contains("Add to Cart").click({ force: true });

    cy.wait(3000);
    cy.get(".minicart-wrapper .counter-number").should("have.text", "3");
  });

  it("Should remove product from the cart.", () => {
    cy.wait(6000);
    cy.get("div.minicart-wrapper").should("be.visible").click();
    cy.get("a.action.delete").eq(2).should("be.visible").click();
    cy.get("button.action-primary.action-accept").should("be.visible").click();
    cy.get(".minicart-wrapper .counter-number").should("have.text", "2");
  });

  it("Should proceed to checkout.", () => {
    cy.get("a.action.viewcart").should("be.visible").click();
    cy.url().should("include", "/checkout/cart");
  });

  it("Should add product to the cart from suggested products.", () => {
    cy.get("button.action.tocart.primary").eq(0).should("be.visible").click();
  });

  it("Should complete the order.", () => {
    cy.get("button[data-role='proceed-to-checkout']")
      .should("be.visible")
      .click();

    cy.wait(8000);
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
