const generator = require("./generator");

describe("Test generator", () => {
    it("shoud get scripts tag", () => {
        const result = generator.getScriptsTag();
        expect(result).toBeTruthy();
    });
    it("should get base config file", () => {
        const config = generator.getBaseConfig();
        console.log(config);
        expect(config).toBeTruthy();
    });
    it("should generate new currency config files", () => {
        const config = generator.generateConfigs();
        console.log(config);
        expect(config).toBeTruthy();
    });
    it("should update package.json with new scripts", () => {
        const result = generator.run();
        console.log(result);
    });
})