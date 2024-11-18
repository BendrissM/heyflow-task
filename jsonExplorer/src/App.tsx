import { FC, useMemo, useState } from "react";
import styles from "./App.module.css";
import { JSONViewer, Label } from "./components";
import { JSONObject } from "./types";
import { getNestedValue } from "./utils";

interface Props {
  json: string;
}

const App: FC<Props> = ({ json }) => {
  const [inputValue, setInputValue] = useState("");
  const parsedJson = useMemo<JSONObject>(() => {
    try {
      return {
        res: JSON.parse(json),
      };
    } catch (e) {
      return {
        res: null,
      };
    }
  }, [json]);

  const computedValue = useMemo(() => {
    if (!parsedJson || !inputValue) return null;

    return getNestedValue(parsedJson, inputValue.split("."));
  }, [parsedJson, inputValue]);

  return (
    <>
      <div className={styles.inputContainer}>
        <Label htmlFor="userInput">Property</Label>
        <input
          id="userInput"
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span className={styles.value}>{`${computedValue}`}</span>
      </div>
      <div className={styles.responseContainer}>
        <Label>Response</Label>
        <div className={styles.viewer}>
          <JSONViewer
            data={parsedJson.res}
            onSelect={setInputValue}
            path={["res"]}
          />
        </div>
      </div>
    </>
  );
};

export default App;
