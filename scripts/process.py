import sys
import json
import pandas as pd


def process_data(data):
    # Convert the input data to a DataFrame
    df = pd.DataFrame(data)

    # Debug: Print the original DataFrame and its columns
    print("\n🔹 Original DataFrame:", file=sys.stderr)
    print(df, file=sys.stderr)
    print("\n🔹 DataFrame Columns:", df.columns.tolist(), file=sys.stderr)

    # Ensure the expected columns exist
    if "column" not in df.columns or "row" not in df.columns:
        return {"error": "Missing 'column' or 'row' in data"}

    # Create a nested dictionary using 'column' as the outer key and (column, row) as inner keys
    nested_dict = (
        df.set_index(["row", "column"])
        .groupby(level=0)
        .apply(lambda d: {str(k[1]): v for k, v in d.to_dict(orient="index").items()})
        .to_dict()
    )

    return nested_dict


for line in sys.stdin:
    try:
        # ✅ Clean input and ensure valid JSON parsing
        line = line.strip()  # Strip unnecessary whitespace

        # ✅ Debugging: Print the raw line
        sys.stderr.flush()
        data = json.loads(line)

        sys.stderr.flush()
        # ✅ Ensure data is a list before passing to pandas
        if not isinstance(data, list):
            raise ValueError("Expected a list of dictionaries but got something else.")

        # ✅ Transform data
        result = process_data(data)

        # ✅ Send back the transformed data
        print(json.dumps(result))
        sys.stdout.flush()
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}))
        sys.stdout.flush()
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.stdout.flush()
