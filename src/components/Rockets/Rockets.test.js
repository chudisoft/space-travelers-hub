import { configureStore } from "@reduxjs/toolkit";
import rocketReducer, {
  getRockets
} from "../../redux/rockets/rocketSlice";

describe("rocketSlice", () => {
  it("should handle initial state", () => {
    const store = configureStore({
      reducer: { rocket: rocketReducer },
    });

    expect(store.getState().rocket.rockets).toEqual([]);
  });
 
  it("should fetch rockets and update state", async () => {
    const store = configureStore({
      reducer: { rocket: rocketReducer },
    });

    await store.dispatch(getRockets());

    const rocketState = store.getState().rocket.rockets;
    expect(rocketState.length).toBeGreaterThan(0);
    expect(rocketState[0]).toHaveProperty("reserved", false);
  });
});
