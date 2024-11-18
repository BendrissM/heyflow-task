import { FC } from "react";
import { JSONValue } from "../../types";
import { isLeaf } from "../../utils";
import styles from "./JSONViewer.module.css";

interface JSONViewerProps {
  data: JSONValue;
  onSelect: (path: string) => void;
  path: string[];
}

const JSONViewer: FC<JSONViewerProps> = ({ data, onSelect, path = [] }) => {
  const handleClick = (currentPath: string[]) => {
    onSelect(
      currentPath.reduce((acc, curr) => {
        if (curr.startsWith("[")) {
          return acc + curr;
        }
        return acc ? acc + "." + curr : curr;
      }, "")
    );
  };

  if (Array.isArray(data)) {
    return (
      <>
        [
        <div className={styles.jsonIndent}>
          {data.map((item, index) => (
            <div key={index}>
              <JSONViewer
                data={item}
                onSelect={onSelect}
                path={[...path, `[${index}]`]}
              />
              {index < data.length - 1 && ","}
            </div>
          ))}
        </div>
        ]
      </>
    );
  }

  if (isLeaf(data)) {
    return <>{JSON.stringify(data)}</>;
  }

  return (
    <>
      {"{"}
      <div className={styles.jsonIndent}>
        {Object.entries(data).map(([key, value], index, arr) => (
          <div key={key}>
            <span
              className={`${styles.jsonKey} ${
                isLeaf(value) ? styles.clickable : ""
              }`}
              onClick={() => isLeaf(value) && handleClick([...path, key])}
            >
              {key}
            </span>
            :{" "}
            <JSONViewer
              data={value}
              onSelect={onSelect}
              path={[...path, key]}
            />
            {index < arr.length - 1 && ","}
          </div>
        ))}
      </div>
      {"}"}
    </>
  );
};

export default JSONViewer;
