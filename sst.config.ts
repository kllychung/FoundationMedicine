import { Stack } from "./stacks/Stack";

export default {
  config(_input: any) {
    return {
      name: "user-app",
      region: "us-east-2",
    };
  },
  stacks(app: any) {
    app.stack(Stack);
  }
};
