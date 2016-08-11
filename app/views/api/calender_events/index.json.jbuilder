@calender_events.each do |event|
  json.set! event.id do
    json.id         event.id
    json.title      event.title
    json.body       event.body
    json.project_id event.project_id
    json.start      event.start
    json.finish     event.finish
  end
end
