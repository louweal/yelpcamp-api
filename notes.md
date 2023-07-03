# Mongo example

For a animalShelter database with a collection named `dogs`

# New db / Switch to existing

```
use dbName
```

# Show collection (table) /

```
show collectionName
```

# Insert items in collection

A single item must be an object, multiple items must be an array of objects

```
db.dogs.insert({name: "Jambo", breed: "Schipperke", age: 1})
```

# Show all items (documents) in collection

```
db.dogs.find()
```

# Query

Returns a reference to the results

```
db.dogs.find({breed: "Schipperke"})

```

Find one result. Returns the result itself

```
db.dogs.findOne({breed: "Schipperke"})
```

# Update

```
db.dogs.updateOne({name: 'Jambo'}, {$set: {age: 2, breed: 'Labrador'}})
```
