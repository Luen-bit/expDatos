cd C:\Users\luis\Documents\sanidad\expDatos 
del "evaluacionHuertosLimpios - EvaluacionV2.csv"
start msedge "https://docs.google.com/spreadsheets/d/1bW3bvvGjMNsxyI1ofar4TuXY1bciSpsm6BJjIYCg95w/export?format=csv&gid=280192890"
cd C:\Users\luis\Downloads
timeout 10
move "evaluacionHuertosLimpios - EvaluacionV2.csv" C:\Users\luis\Documents\sanidad\expDatos
cd C:\Users\luis\Documents\sanidad\expDatos 
node app.js
timeout 10