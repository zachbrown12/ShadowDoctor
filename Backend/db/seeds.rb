##
require 'rest-client'
require 'json'
require 'pry'

Student.destroy_all
Doctor.destroy_all
Shadow.destroy_all
Document.destroy_all


skip = 0

50.times do 
    i = 0
    doc_source = RestClient.get "https://api.1up.health/fhir/dstu2/Practitioner?_public=true&client_id=f1c1817ab463454b95b30282b5d83e2e&client_secret=K3gTbYeeiedmqCB97t5Nk1sdt3Gx5Go2&_skip=#{skip}", {:Authorization => 'Bearer fc4772804214498abebeee9485c3e2f7'}
    doctors = JSON.parse(doc_source)
    skip += 10
     10.times do
       doctor = doctors["entry"][i]
           name = 
             begin 
              "#{(doctor["resource"]["name"]["given"][0])}, #{(doctors["entry"][i]["resource"]["name"]["family"][0])}"
             rescue 
              "Null"
             end
           city = 
           begin 
            "#{(doctors["entry"][i]["resource"]["address"][0]["city"])}"
           rescue 
            "Null"
           end
           state = 
           begin 
            "#{(doctors["entry"][i]["resource"]["address"][0]["state"])}"
           rescue 
            "Null"
           end
           hospital = 
           begin 
            "#{(doctors["entry"][i]["resource"]["address"][0]["line"][0])}"
           rescue 
            "Null"
           end
           practice = 
           begin 
            "#{(doctors["entry"][i]["resource"]["practitionerRole"][0]["role"]["coding"][0]["display"])}" 
           rescue 
            "Null"
           end
           phone_number = 
           begin 
            "#{(doctors["entry"][i]["resource"]["telecom"][0]["value"])}" 
           rescue 
            "Null"
           end
             
       Doctor.create(
        name: name,        
        city: city,
        state: state,
        hospital: hospital,
        practice: practice,
        phone_number: phone_number
    )
        i += 1
     end
    sleep(0.2)
    end






##s1 = Student.create(name:"Zach", school:"UNC", age: 25, bio: "Hello") 
##s2 = Student.create(name:"Komal", school:"FlatIron", age: 29, bio: "Sup") 
##
##sd1 = Shadow.create(student_id: s1.id, doctor_id: Doctor.all.first.id, start_date: 04132020, length:"7 days", accepted: true)
##sd2 = Shadow.create(student_id: s2.id, doctor_id: Doctor.all.first.id, start_date: 04052020, length:"5 days", accepted: false)
##
##dm1 = Document.create(student_id: s1.id, document_name:"Resume ZB", document_type:"Word")
##dm2 = Document.create(student_id: s1.id, document_name:"Cover Letter ZB", document_type:"PDF")

    
