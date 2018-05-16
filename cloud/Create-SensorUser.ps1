param(
    $username = "tempsensor",
    $group = "tempsensor",
    $policy = "tempsensor-write"
)

$script:__PATH__ = Split-Path -parent $PSCommandPath

function Main()
{
    Create-User
    Add-UserToGroup

    Create-Policy
    Set-GroupPolicy
}

function Create-User()
{
    try
    {
        $output = aws iam create-user --user-name $script:username
    }
    catch
    {
        Write-Host "This is probably OK (user already exists?): $_"
    }
}

function Add-UserToGroup()
{
    Create-Group
    aws iam add-user-to-group --user-name $script:username --group $script:group
}


function Set-GroupPolicy()
{
    $policy = Find-Policy $script:policy
    aws iam attach-group-policy --group-name $script:group --policy-arn $policy.Arn
}

function Create-Policy()
{
    aws iam create-policy --policy-name tempsensor-write --policy-document file://$__PATH__/config/tempuser-policy.json
}

function Create-Group()
{
    aws iam create-group --group-name $script:group
}

function Find-Policy($private:policyName)
{
    $policies = aws iam list-policies | ConvertFrom-Json
    foreach ($policy in $policies.Policies)
    {
        if ($policy.PolicyName -match $script:policy)
        {
            Write-Host "Found policy: $($policy.PolicyName)"
            return $policy
        }
    }
}

Main
