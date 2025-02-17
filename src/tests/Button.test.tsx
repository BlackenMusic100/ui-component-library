import "@testing-library/jest-dom";
import Button from "../components/Button";
import { render } from "@testing-library/react";

describe("Button", () => {
  it("renders text", () => {
    // Arrange
    const text = "Test Text";
    const onClick = jest.fn()
    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
      onClick
    }
    const { getByText } = render(<Button text={text} button={buttonProps}></Button>);

    // Act
    const titleElement = getByText(text);

    // Assert
    expect(titleElement).toBeInTheDocument();
  });
});