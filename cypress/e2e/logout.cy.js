const baseURL = "http://127.0.0.1:8080/";
describe("Logout", () => {
  it("Can log out", () => {
    cy.visit(baseURL);
    cy.wait(500);
    // gets the currently showing close button
    cy.get(".btn-close:visible").click();
    cy.get("button[data-auth='login']").click();
    cy.wait(500);
    cy.get("input[type='email']:visible")
      .should("exist")
      .type(`jester@noroff.no`);
    cy.get("input[type='password']:visible")
      .should("exist")
      .type(`password123`);
    cy.get(".btn-success:visible").click();
    cy.wait(1000);
    cy.then(() => expect(window.localStorage.getItem("token")).to.not.be.null);
    cy.then(
      () => expect(window.localStorage.getItem("profile")).to.not.be.null
    );
    cy.get("button[data-auth='logout']").click();
    cy.wait(1000);
    cy.url().should("not.include", "profile");
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
  });
});
