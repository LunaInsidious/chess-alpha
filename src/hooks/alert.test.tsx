/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from "@testing-library/react";

import { AlertProvider } from "@/components/providers/AlertProvider";
import { useAlert } from "@/hooks/alert";

describe("useAlert", () => {
  // AlertProviderの実装を用いるためのラッパー
  let wrapper;
  let { result } = renderHook(() => useAlert(), { wrapper });
  beforeEach(() => {
    wrapper = ({ children }: any) => <AlertProvider>{children}</AlertProvider>;
    result = renderHook(() => useAlert(), { wrapper }).result;
  });
  describe("アラートに動作を与えていない状態", () => {
    test("アラートはseverityはsuccessの状態で開いていない", () => {
      const { state } = result.current;
      expect(state.isAlertOpen).toBe(false);
      expect(state.message).toEqual("");
      expect(state.severity).toEqual("success");
    });
  });
  describe("アラートを開く", () => {
    test("showSuccessを実行したらsuccessアラートが表示される", () => {
      const { showSuccess } = result.current;

      act(() => showSuccess({ message: "成功" }));

      const { state } = result.current;
      expect(state.isAlertOpen).toBe(true);
      expect(state.message).toEqual("成功");
      expect(state.severity).toEqual("success");
    });
    test("showErrorを実行したらerrorアラートが表示される", () => {
      const { showError } = result.current;

      act(() => showError({ message: "失敗" }));

      const { state } = result.current;
      expect(state.isAlertOpen).toBe(true);
      expect(state.message).toEqual("失敗");
      expect(state.severity).toEqual("error");
    });
    describe("timeout5000を設定してshowSuccessを実行すると", () => {
      beforeEach(() => {
        // テスト内で実際に待機しないように、fake timerを設定
        jest.useFakeTimers();
      });
      afterEach(() => {
        // fake timerの設定を切る。
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });
      test.each([
        { time: 4999, isExist: true },
        { time: 5000, isExist: false },
      ])("$time秒後はisExist:$isExist", ({ time, isExist }) => {
        const { showSuccess } = result.current;

        act(() => {
          showSuccess({ message: "成功でも消える", timeout: 5000 });
          jest.advanceTimersByTime(time);
        });

        const { state } = result.current;
        expect(state.isAlertOpen).toBe(isExist);
        expect(state.message).toEqual("成功でも消える");
        expect(state.severity).toEqual("success");
      });
    });
  });
  describe("アラートを閉じる", () => {
    test("successアラートに対してcloseAlertを実行するとisAlertOpenのみがoffになる", () => {
      const { showSuccess, closeAlert } = result.current;

      act(() => {
        showSuccess({ message: "成功" });
        closeAlert();
      });

      const { state } = result.current;
      expect(state.isAlertOpen).toBe(false);
      expect(state.message).toEqual("成功");
      expect(state.severity).toEqual("success");
    });
    test("errorアラートに対してcloseAlertを実行するとisAlertOpenのみがoffになる", () => {
      const { showError, closeAlert } = result.current;

      act(() => {
        showError({ message: "失敗" });
        closeAlert();
      });

      const { state } = result.current;
      expect(state.isAlertOpen).toBe(false);
      expect(state.message).toEqual("失敗");
      expect(state.severity).toEqual("error");
    });
    test("開かれていないアラートを閉じようとしても何も変化しない", () => {
      const { showError, closeAlert } = result.current;
      act(() => {
        showError({ message: "失敗" });
        closeAlert();
      });

      expect(result.current.state.isAlertOpen).toBe(false);
      expect(result.current.state.message).toEqual("失敗");
      expect(result.current.state.severity).toEqual("error");

      act(() => {
        closeAlert();
      });

      expect(result.current.state.isAlertOpen).toBe(false);
      expect(result.current.state.message).toEqual("失敗");
      expect(result.current.state.severity).toEqual("error");
    });
  });
  describe("アラートの切り替え", () => {
    test("successアラートを閉じてerrorアラートを表示させると、errorアラートが表示される", () => {
      const { showSuccess, showError, closeAlert } = result.current;

      act(() => {
        showSuccess({ message: "成功" });
        closeAlert();
        showError({ message: "失敗" });
      });

      const { state } = result.current;
      expect(state.isAlertOpen).toBe(true);
      expect(state.message).toEqual("失敗");
      expect(state.severity).toEqual("error");
    });
    test("errorアラートを閉じてsuccessアラートを表示させると、successアラートが表示される", () => {
      const { showSuccess, showError, closeAlert } = result.current;

      act(() => {
        showError({ message: "失敗" });
        closeAlert();
        showSuccess({ message: "成功" });
      });

      const { state } = result.current;
      expect(state.isAlertOpen).toBe(true);
      expect(state.message).toEqual("成功");
      expect(state.severity).toEqual("success");
    });
    test("アラートを閉じずに切り替えると、最後に実行したものがアラートとして表示される。", () => {
      const { showSuccess, showError } = result.current;

      act(() => {
        showSuccess({ message: "成功message" });
        showError({ message: "失敗メッセージ" });
      });

      const { state } = result.current;
      expect(state.isAlertOpen).toBe(true);
      expect(state.message).toEqual("失敗メッセージ");
      expect(state.severity).toEqual("error");
    });
  });
});
