import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import fs from 'fs';

// fs ব্যবহার করলে কোনো ExperimentalWarning আসবে না
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

test.describe('Data-Driven Login Tests', () => {
  users.forEach((user, index) => {
    test(`Case ${index + 1}: ${user.username} -> Expect: ${user.expected}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const inventoryPage = new InventoryPage(page);

      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.expected === 'success') {
        const isLoaded = await inventoryPage.isLoaded();
        expect(isLoaded).toBe(true);
      } else if (user.expected === 'error') {
        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg.length).toBeGreaterThan(0);
      }
    });
  });
});