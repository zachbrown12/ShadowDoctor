# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Student.destroy_all
Doctor.destroy_all
Shadow.destroy_all
Document.destroy_all

s1 = Student.create(name:"Zach", school:"UNC", age: 25, bio: "Hello") 
s2 = Student.create(name:"Komal", school:"FlatIron", age: 29, bio: "Sup") 

d1 = Doctor.create(name:"Dr. Steve", location:"New York", hospital:"NYU Langone", practice:"Cardiologist", participation: 30.5, notes:"Very good doctor")
d2 = Doctor.create(name:"Dr. Fauci", location:"Washington DC", hospital:"Retired", practice:"Epidemeology", participation: 50.6, notes:"Super Smart")

sd1 = Shadow.create(student_id: s1.id, doctor_id: d1.id, start_date: 04132020, length:"7 days", accepted: true)
sd2 = Shadow.create(student_id: s2.id, doctor_id: d2.id, start_date: 04052020, length:"5 days", accepted: false)

dm1 = Document.create(student_id: s1.id, document_name:"Resume ZB", document_type:"Word")
dm2 = Document.create(student_id: s1.id, document_name:"Cover Letter ZB", document_type:"PDF")
