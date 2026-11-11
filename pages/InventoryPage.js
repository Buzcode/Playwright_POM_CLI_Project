// pages/InventoryPage.js
export class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Locators for inventory page
    this.title = page.locator('.title');
    this.inventoryList = page.locator('.inventory_list');
  }

  async isLoaded() {
    // Inventory page লোড হলে 'Products' টাইটেল দৃশ্যমান থাকবে
    await this.title.waitFor({ state: 'visible', timeout: 5000 });
    return await this.title.isVisible();
  }
}