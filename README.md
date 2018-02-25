# realtime_chart
This project is for Hackillinois.
## Description
This project combines the timeline chart and gantt chart together in order to track the dependencies of the tasks and match the tasks with the machine they are running on.

## Challenges
Since timeline chart in google-chart doesn't have any property with dependencies, it's hard to draw arrows between each task. Finally, we comes up the solution that after the DOM finish the rendering, we loop through the possible tag for the task bars and get the positions. Then we are able to use the position to draw arrows between the task bars.

## JSON Schema
```
[{
"proj": projectName,
"tasks": [
  "machine": machineName,
  "start": startTime,
  "end": endTime,
  "next": [List of dependecies]
]},
{proj ...}
]
```
