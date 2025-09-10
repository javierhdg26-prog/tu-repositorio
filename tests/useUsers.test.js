// tests/useUsers.test.js
import { describe, it, expect, vi } from "vitest";

vi.mock("firebase/firestore", () => {
  return {
    collection: vi.fn(),
    addDoc: vi.fn(),
    doc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    onSnapshot: vi.fn((q, onNext) => {
      // Simula snapshot vacío
      onNext({ docs: [] });
      return () => {};
    }),
    query: vi.fn(),
    orderBy: vi.fn(),
  };
});

describe("useUsers hook - smoke", () => {
  it("should expose CRUD functions", async () => {
    const mod = await import("../src/hooks/useUsers");
    const useUsers = mod.default;
    const hook = useUsers();
    expect(hook).toHaveProperty("createUser");
    expect(hook).toHaveProperty("updateUser");
    expect(hook).toHaveProperty("deleteUser");
  });

  it("createUser should call addDoc", async () => {
    const { addDoc } = await import("firebase/firestore");
    const mod = await import("../src/hooks/useUsers");
    const { createUser } = mod.default();
    await createUser({ name: "Test", role: "operario" });
    expect(addDoc).toHaveBeenCalled();
  });

  it("updateUser should call updateDoc", async () => {
    const { updateDoc } = await import("firebase/firestore");
    const mod = await import("../src/hooks/useUsers");
    const { updateUser } = mod.default();
    await updateUser("abc123", { name: "Nuevo" });
    expect(updateDoc).toHaveBeenCalled();
  });
});
