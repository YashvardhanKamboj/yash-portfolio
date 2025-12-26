# 🧪 Complete Testing Guide

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test File
```bash
npm test -- api.test.js
```

## Test Types

### 1. Unit Tests (`tests/api.test.js`)

**What's Tested:**
- ✅ API endpoints
- ✅ Request validation
- ✅ Error handling
- ✅ Rate limiting
- ✅ Security (XSS, injection)

**Example:**
```javascript
it('should submit contact form successfully', async () => {
  const response = await request(app)
    .post('/api/contact')
    .send(contactData)
    .expect(201);
  
  expect(response.body.success).toBe(true);
});
```

### 2. Integration Tests (`tests/integration.test.js`)

**What's Tested:**
- ✅ End-to-end workflows
- ✅ Database operations
- ✅ Multiple API calls together
- ✅ Data flow

**Example:**
```javascript
it('should complete full contact form flow', async () => {
  // Submit form
  // Verify saved
  // Check analytics updated
});
```

### 3. Frontend Tests (`tests/frontend.test.js`)

**What's Tested:**
- ✅ API integration
- ✅ Form validation
- ✅ Error handling
- ✅ User interactions

## Test Coverage Goals

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Manual Testing Checklist

### Functional Testing

- [ ] Contact form submission
- [ ] Form validation (email, required fields)
- [ ] Error messages display correctly
- [ ] Success messages display
- [ ] Page navigation works
- [ ] All links work
- [ ] Images load correctly
- [ ] Responsive design (mobile, tablet, desktop)

### API Testing

- [ ] Health endpoint returns 200
- [ ] Contact form accepts valid data
- [ ] Contact form rejects invalid data
- [ ] Rate limiting works
- [ ] Analytics tracking works
- [ ] Projects load correctly
- [ ] Admin dashboard loads

### Security Testing

- [ ] XSS attempts blocked
- [ ] SQL/MongoDB injection blocked
- [ ] Rate limiting active
- [ ] CORS configured correctly
- [ ] Security headers present
- [ ] Input sanitization works

### Performance Testing

- [ ] Page loads in < 3 seconds
- [ ] API responses < 500ms
- [ ] No memory leaks
- [ ] Handles concurrent requests
- [ ] Database queries optimized

### Browser Testing

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Alt text on images
- [ ] Form labels present

## Load Testing

### Using Artillery

```bash
npm install -g artillery
artillery run load-test.yml
```

### Test Scenarios

1. **Normal Load**: 10 users/second
2. **Peak Load**: 50 users/second
3. **Stress Test**: 100 users/second
4. **Spike Test**: Sudden 200 users

## E2E Testing (Optional)

### Playwright

```bash
npm install -D @playwright/test
npx playwright test
```

### Cypress

```bash
npm install -D cypress
npx cypress open
```

## Test Data

### Seed Test Database

```javascript
// tests/seed.js
import mongoose from 'mongoose';
import Contact from '../backend/models/Contact.js';

export async function seedTestData() {
  await Contact.create({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test',
    message: 'Test message',
  });
}
```

## Continuous Testing

Tests run automatically on:
- ✅ Every git push
- ✅ Pull requests
- ✅ Before deployment
- ✅ Scheduled (nightly)

## Debugging Tests

```bash
# Run with debug output
DEBUG=* npm test

# Run single test
npm test -- -t "should submit contact form"

# Run with verbose output
npm test -- --verbose
```

## Test Best Practices

1. **Isolate tests** - Each test should be independent
2. **Clean up** - Remove test data after tests
3. **Mock external services** - Don't call real APIs
4. **Test edge cases** - Invalid inputs, empty data
5. **Test error paths** - What happens when things fail
6. **Keep tests fast** - Use async/await properly
7. **Descriptive names** - Test names should explain what they test

---

**Run tests before every commit!**

