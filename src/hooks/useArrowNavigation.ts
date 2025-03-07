import { useReducer, KeyboardEvent } from "react";

export type ActiveSection = "input" | "direct" | "vibed";

export interface ArrowState {
  activeSection: ActiveSection;
  activeIndex: number;
}

type Action =
  | { type: "RESET" }
  | { type: "ARROW_DOWN"; directCount: number; vibedCount: number }
  | { type: "ARROW_UP"; directCount: number; vibedCount: number };

function arrowReducer(state: ArrowState, action: Action): ArrowState {
  switch (action.type) {
    case "RESET":
      return { activeSection: "input", activeIndex: -1 };

    case "ARROW_DOWN":
      if (state.activeSection === "vibed") {
        return { activeSection: "input", activeIndex: -1 };
      } else if (state.activeSection === "input") {
        if (action.directCount > 0) {
          return { activeSection: "direct", activeIndex: 0 };
        }
      } else if (state.activeSection === "direct") {
        if (state.activeIndex < action.directCount - 1) {
          return { ...state, activeIndex: state.activeIndex + 1 };
        }
      }
      return state;

    case "ARROW_UP":
      if (state.activeSection === "direct") {
        if (state.activeIndex > 0) {
          return { ...state, activeIndex: state.activeIndex - 1 };
        } else {
          return { activeSection: "input", activeIndex: -1 };
        }
      } else if (state.activeSection === "input") {
        if (action.vibedCount > 0) {
          return { activeSection: "vibed", activeIndex: action.vibedCount - 1 };
        }
      } else if (state.activeSection === "vibed") {
        if (state.activeIndex > 0) {
          return { ...state, activeIndex: state.activeIndex - 1 };
        }
      }
      return state;

    default:
      return state;
  }
}

export function useArrowNavigation(
  directCount: number,
  vibedCount: number
): {
  state: ArrowState;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  dispatch: (action: Action) => void;
} {
  const [state, dispatch] = useReducer(arrowReducer, {
    activeSection: "input",
    activeIndex: -1,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      dispatch({ type: "ARROW_DOWN", directCount, vibedCount });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      dispatch({ type: "ARROW_UP", directCount, vibedCount });
    }
  };

  return { state, handleKeyDown, dispatch };
}
