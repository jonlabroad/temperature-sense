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
    Create-AccessKey
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
    aws iam create-policy --policy-name $script:policy --policy-document file://$__PATH__/config/tempuser-policy.json
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

function Create-AccessKey()
{
    $accessKeys = aws iam list-access-keys --user-name $script:username | ConvertFrom-Json
    if ($accessKeys.AccessKeyMetadata.Count -eq 0)
    {
        $newAccessKey = aws iam create-access-key --user-name $script:username | ConvertFrom-Json
        Write-Host ($newAccessKey | ConvertTo-Json)
    }
    else {
        Write-Host "Access key already exists. Key id: $($accessKeys.AccessKeyMetadata.AccessKeyId)"
    }
}

Main
