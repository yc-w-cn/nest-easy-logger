# CHANGELOG

## 2024-12-27 v1.0.6

- **Added**: Support for BigInt. This feature enables the application to handle large integers that exceed the safe range of the standard JavaScript `Number` type.
- **Enhanced**: The `bigIntReplacer` function has been improved to ensure proper serialization and deserialization of BigInt values during data storage and transmission.