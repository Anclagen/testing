describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("Can login", () => {
    console.log(Cypress.env("EMAIL"));
    cy.visit("/");
    cy.wait(500);
    // gets the currently showing close button
    cy.get(".btn-close:visible").click();
    cy.get("button[data-auth='login']").click();
    cy.wait(500);
    cy.get("input[type='email']:visible")
      .should("exist")
      .type(Cypress.env("EMAIL"));
    cy.get("input[type='password']:visible")
      .should("exist")
      .type(Cypress.env("PASSWORD"));
    cy.get(".btn-success:visible").click();
    cy.wait(2000);
    cy.then(() => expect(window.localStorage.getItem("token")).to.not.be.null);
    cy.then(
      () => expect(window.localStorage.getItem("profile")).to.not.be.null
    );
    cy.url().should("include", "profile");
  });

  it("Validates user email input based on API restrictions", () => {
    cy.visit("/");
    cy.wait(500);
    // gets the currently showing close button
    cy.get(".btn-close:visible").click();
    cy.get("button[data-auth='login']").click();
    cy.wait(500);
    cy.get("input[type='email']:visible")
      .should("exist")
      .type(`jester@norof.no`);
    cy.get("input[type='password']:visible").should("exist").type(`password`);
    cy.get(".btn-success:visible").click();
    cy.wait(2000);
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
    cy.url().should("not.include", "profile");
  });

  it("Validates user password input based on API restrictions", () => {
    cy.visit("/");
    cy.wait(500);
    // gets the currently showing close button
    cy.get(".btn-close:visible").click();
    cy.get("button[data-auth='login']").click();
    cy.wait(500);
    cy.get("input[type='email']:visible")
      .should("exist")
      .type(`jester@noroff.no`);
    cy.get("input[type='password']:visible").should("exist").type(`pass`);
    cy.get(".btn-success:visible").click();
    cy.wait(2000);
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
    cy.url().should("not.include", "profile");
  });

  it("Return invalid password/email message", () => {
    cy.visit("/");
    cy.wait(500);
    // gets the currently showing close button
    cy.get(".btn-close:visible").click();
    cy.get("button[data-auth='login']").click();
    cy.wait(500);
    cy.get("input[type='email']:visible").should("exist").type(EMAIL);
    cy.get("input[type='password']:visible").should("exist").type(`wrongword`);
    cy.get(".btn-success:visible").click();
    cy.wait(2000);
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
    cy.url().should("not.include", "profile");
  });
});
