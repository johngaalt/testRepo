import React from "react";

interface Param {
  id: number;
  name: string;
  type: string;
}

interface ParamValue {
  paramId: number;
  value: string | number | boolean;
}

interface Color {
  name: string;
  hexValue: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  model: Model;
  params: Param[];
}

interface State {
  model: Model;
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: {
        paramValues:
          props.model.paramValues.length > 0
            ? props.model.paramValues
            : this.getModel().paramValues,
        colors: props.model.colors || [],
      },
    };
  }

  getModel(): Model {
    return {
      paramValues: this.props.params.map((p) => ({ paramId: p.id, value: "" })),
    };
  }

  handleInputChange = (
    paramId: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const param = this.props.params.find((p) => p.id === paramId);
    let value: string | number | boolean = event.target.value;

    if (param) {
      switch (param.type) {
        case "number":
          value = Number(event.target.value);
          break;
        case "boolean":
          value = event.target.checked;
          break;
        case "string":
        default:
          value = event.target.value;
      }
    }

    this.setState((prevState) => ({
      model: {
        ...prevState.model,
        paramValues: prevState.model.paramValues.map((paramValue) =>
          paramValue.paramId === paramId
            ? { ...paramValue, value }
            : paramValue,
        ),
      },
    }));
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(this.state.model.paramValues);
  };

  render() {
    const inputs = this.props.params.map((param) => {
      let inputElement;

      if (param.type === "boolean") {
        inputElement = (
          <input
            type="checkbox"
            checked={
              !!this.state.model.paramValues.find((p) => p.paramId === param.id)
                ?.value
            }
            onChange={(e) => this.handleInputChange(param.id, e)}
          />
        );
      } else {
        inputElement = (
          <input
            type={param.type === "number" ? "number" : "text"}
            value={
              this.state.model.paramValues
                .find((p) => p.paramId === param.id)
                ?.value.toString() || ""
            }
            onChange={(e) => this.handleInputChange(param.id, e)}
          />
        );
      }

      return (
        <div
          key={param.id}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "10px",
          }}
        >
          <h3 style={{ marginRight: "10px" }}>{param.name}:</h3>
          {inputElement}
        </div>
      );
    });

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={this.handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {inputs}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ParamEditor;
