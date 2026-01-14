$files = Get-ChildItem -Path "c:\Prog\dc20clean\src\lib\rulesdata\spells-data" -Filter "*.ts" -Recurse
foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $newContent = $content -replace "\s*isCantrip: (true|false),?", ""
    $newContent = $newContent -replace "cantripPassive:", "spellPassive:"
    $newContent | Set-Content $file.FullName
}
