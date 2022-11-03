const baseURL = "https://golden-nougat-25c1c2.netlify.app/";
describe("empty spec", () => {
  it("Can log out", () => {
    cy.visit(baseURL);
    cy.wait(500);
    // gets the currently showing close button
    cy.get(".btn-close:visible").click();
    cy.get("button[data-auth='login']").click();
    cy.wait(500);
    cy.get("input[type='email']:visible").should("exist").type(`jester@noroff.no`);
    cy.get("input[type='password']:visible").should("exist").type(`password123`);
    cy.get(".btn-success:visible").click();
    cy.wait(1000);
    cy.get("button[data-auth='logout']").click();
    cy.wait(1000);
    cy.url().should("not.include", "profile");
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
  });
});
