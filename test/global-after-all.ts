export default function() {
  afterAll(async () => {
    await global.testApp.close();
  });
}