import node
import process

if __name__ == "__main__":
    node.log('Shell Started')
    node.ready()
    
    while True:
        # 1️⃣ Receive data from NestJS
        data = node.recive()

        # 2️⃣ Process the data
        processed_data = process.process_data(data)

        # 3️⃣ Log the processed output
        node.log(f"Data Processed: {processed_data}")

        # 4️⃣ Emit the processed data back to NestJS
        node.emit(processed_data)

        # 5️⃣ Indicate Python is ready for new data
        node.ready()
