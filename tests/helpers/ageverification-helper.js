// helpers/common-utils.js

async function handleAgeModal(page) {
    const modal = page.locator('#mc_modal');

    try {
        // Wait max 5 seconds if modal appears
        await modal.waitFor({ state: 'visible', timeout: 5000 });

        const ageBtn = page.locator('.age-actions .btn.btn-over');
        await ageBtn.click();

        // Wait for modal to disappear (stable UI)
        await modal.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (e) {
        console.error(e)
    }
}

module.exports = { handleAgeModal };
