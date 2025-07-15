def save_files_data(file_paths, output_file):
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for path in file_paths:
            out_file.write(f"\n\n=== File: {path} ===\n")
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    out_file.write(content)
            except Exception as e:
                out_file.write(f"[Error reading file]: {e}")

if __name__ == "__main__":
    # 🔧 Replace with your actual file paths
    files = [
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        r"",
        
        
        
    ]
    
    # 🔧 Output file where results will be saved
    output = "output.txt"

    save_files_data(files, output)
    print(f"Data saved to {output}")