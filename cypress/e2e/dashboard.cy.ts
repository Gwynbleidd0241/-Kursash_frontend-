describe('Проверка главной страницы', () => {
    it('Открывает дашборд и проверяет заголовок', () => {
        cy.visit('http://localhost:3000', {
            onBeforeLoad(win) {
                win.localStorage.setItem('authenticated', 'true');
            },
        });

        cy.contains('Административная панель').should('exist');
    });
});
