describe("Scenario two", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});

it("Should navigate to women pants section.", () => {
  cy.visit("/");
  cy.get("a#ui-id-4").should("be.visible").trigger("mouseover");
  cy.get("a#ui-id-10").should("be.visible").trigger("mouseover");
  cy.get("a#ui-id-15").should("be.visible").click();

  cy.url().should("include", "/women/bottoms-women/pants-women.html");
});

it("Should filter section to show the cheapest products available.", () => {
  cy.contains("div.filter-options-title", "Price").should("be.visible").click();
  cy.get("div.filter-options-content")
    .contains("$30.00 - $39.99")
    .should("be.visible")
    .click();
  cy.wait(6000);
  cy.get("#sorter").should("be.visible").select("Price");
});

it("Should select the cheapest pants.", () => {
  cy.wait(6000);
  cy.get("div#option-label-size-143-item-171")
    .first()
    .should("be.visible")
    .click();
  cy.get("div#option-label-color-93-item-52")
    .first()
    .should("be.visible")
    .click();
});
