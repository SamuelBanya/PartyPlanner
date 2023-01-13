import styled from "styled-components";

const COLORS = {
  primary: {
    "--main": "blue",
    "--accent": "white",
  },
  secondary: {
    "--main": "seashell",
    "--accent": "orangered",
  },
};

function Button({ variant = "fill", color = "primary", ...props }) {
  let Component;
  if (variant === "fill") {
    Component = FillButton;
  } else if (variant === "outline") {
    Component = OutlineButton;
  }

  return <Component style={COLORS[color]} {...props} />;
}

// Used this StackOverflow post's 'DEMO' section to get the buttons to align their text vertically:
// https://stackoverflow.com/questions/67413388/how-can-i-center-text-in-a-button-component-using-styled-components
const ButtonBase = styled.button`
  display: flex;
  line-height: 16px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 8px 16px;
  text-decoration: none;
`;

const FillButton = styled(ButtonBase)`
  background-color: var(--main);
  color: var(--accent);

  &:hover {
    opacity: 0.9;
  }
`;

const OutlineButton = styled(ButtonBase)`
  background-color: white;
  color: var(--main);
  border: 2px solid var(--main);

  &:hover {
    background: hsl(235deg 85% 97%);
  }
`;

export default Button;
